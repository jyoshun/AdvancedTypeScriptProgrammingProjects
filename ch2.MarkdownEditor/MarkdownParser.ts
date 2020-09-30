/**
 * 提供给用户的 Markdown 标签.
 */
enum TagType {
    Paragraph,
    Header1,
    Header2,
    Header3,
    HorizontalRule,
}

/**
 * 将 TagType 映射到对应的 HTML 标签.
 */
class TagTypeToHtml {
    private readonly tagType: Map<TagType, string> = new Map<TagType, string>();
    constructor() {
        this.tagType.set(TagType.Header1, 'h1');
        this.tagType.set(TagType.Header2, 'h2');
        this.tagType.set(TagType.Header3, 'h3');
        this.tagType.set(TagType.Paragraph, 'p');
        this.tagType.set(TagType.HorizontalRule, 'hr');
    }
    private GetTag(tagType: TagType, openingTagPattern: string): string {
        let tag = this.tagType.get(tagType);
        if (tag !== null) {
            return `${openingTagPattern}${tag}>`;
        }
        return `${openingTagPattern}p>`;
    }
    public OpeningTag(tagType: TagType): string {
        return this.GetTag(tagType, '<');
    }
    public ClosingTag(tagType: TagType): string {
        return this.GetTag(tagType, '</');
    }
}

/**
 * 接口.
 */
interface IMarkdownDocument {
    Add(...content: string[]): void;
    Get(): string;
}

/**
 * 转换后的 Markdown 标记.
 */
class MarkdownDocument implements IMarkdownDocument {
    private content: string = '';
    Add(...content: string[]): void {
        // content.forEach(element => {
        //     this.content += element;
        // });
        content.reduce(((_, element) => this.content += element), '');
    }
    Get(): string {
        return this.content;
    }
}

/**
 * 当前正在处理的行.
 */
class ParseElement {
    CurrentLine: string = '';
}

/**
 * 访问者模式.
 */
interface IVisitor {
    Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
interface IVisitable {
    Accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void;
}
abstract class VisitorBase implements IVisitor {
    protected constructor(private readonly tagType: TagType,
                          private readonly tagTypeToHtml: TagTypeToHtml) {}
    Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
        markdownDocument.Add(
            this.tagTypeToHtml.OpeningTag(this.tagType),
            token.CurrentLine,
            this.tagTypeToHtml.ClosingTag(this.tagType)
        );
    }
}
class Header1Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header1, new TagTypeToHtml());
    }
}
class Header2Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header2, new TagTypeToHtml());
    }
}
class Header3Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header3, new TagTypeToHtml());
    }
}
class ParagraphVisitor extends VisitorBase {
    constructor() {
        super(TagType.Paragraph, new TagTypeToHtml());
    }
}
class HorizontalRuleVisitor extends VisitorBase {
    constructor() {
        super(TagType.HorizontalRule, new TagTypeToHtml());
    }
}
class Visitable implements IVisitable {
    Accept(visitor: IVisitor,
           token: ParseElement,
           markdownDocument: IMarkdownDocument): void {
        visitor.Visit(token, markdownDocument);
    }
}

/**
 * 责任链模式.
 */
abstract class Handler<T> {
    protected next: Handler<T> | null = null;
    public SetNext(next: Handler<T>): void {
        this.next = next;
    }
    public HandleRequest(request: T): void {
        if (!this.CanHandle(request)) {
            if (this.next !== null) {
                this.next.HandleRequest(request);
            }
        }
    }
    protected abstract CanHandle(request: T): boolean;
}
class LineParser {
    public Parse(value: string, tag: string): [boolean, string] {
        let output: [boolean, string] = [false, ''];
        output[1] = value;
        if (value === '') {
            return output;
        }
        let split = value.startsWith(`${tag}`);
        if (split) {
            output[0] = true;
            output[1] = value.substr(tag.length);
        }
        return output;
    }
}
class ParseChainHandler extends Handler<ParseElement> {
    private readonly visitable: IVisitable = new Visitable();
    constructor(private readonly document: IMarkdownDocument,
                private readonly tagType: string,
                private readonly visitor: IVisitor) {
        super();
    }
    protected CanHandle(request: ParseElement): boolean {
        let split = new LineParser().Parse(request.CurrentLine, this.tagType);
        if (split[0]) {
            request.CurrentLine = split[1];
            this.visitable.Accept(this.visitor, request, this.document);
        }
        return split[0];
    }
}
class ParagraphHandler extends Handler<ParseElement> {
    private readonly visitable: IVisitable = new Visitable();
    private readonly visitor: IVisitor = new ParagraphVisitor();
    constructor(private readonly document: IMarkdownDocument) {
        super();
    }
    protected CanHandle(request: ParseElement): boolean {
        this.visitable.Accept(this.visitor, request, this.document);
        return true;
    }
}
class Header1ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, '# ', new Header1Visitor());
    }
}
class Header2ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, '## ', new Header2Visitor());
    }
}
class Header3ChainHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, '### ', new Header3Visitor());
    }
}
class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document: IMarkdownDocument) {
        super(document, '---', new HorizontalRuleVisitor());
    }
}
/**
 * 构建责任链.
 */
class ChainOfResponsibilityFactory {
    Build(document: IMarkdownDocument): ParseChainHandler {
        let header1: Header1ChainHandler = new Header1ChainHandler(document);
        let header2: Header2ChainHandler = new Header2ChainHandler(document);
        let header3: Header3ChainHandler = new Header3ChainHandler(document);
        let horizontalRule: HorizontalRuleHandler = new HorizontalRuleHandler(document);
        let paragraph: ParagraphHandler = new ParagraphHandler(document);

        header1.SetNext(header2);
        header2.SetNext(header3);
        header3.SetNext(horizontalRule);
        horizontalRule.SetNext(paragraph);

        return header1;
    }
}

/**
 * 综合运用.
 */
class Markdown {
    public ToHtml(text: string): string {
        let document: IMarkdownDocument = new MarkdownDocument();
        let header1: Header1ChainHandler = new ChainOfResponsibilityFactory().Build(document);
        let lines: string[] = text.split('\n');
        for (let index = 0; index < lines.length; index++) {
            let parseElement: ParseElement = new ParseElement();
            parseElement.CurrentLine = lines[index];
            header1.HandleRequest(parseElement);
        }
        return document.Get();
    }
}

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
/**
 * TextArea to Label.
 */
class HtmlHandler {
    private markdownChange: Markdown = new Markdown();
    private RenderHtmlContent(markdown: HTMLTextAreaElement,
                              markdownOutput: HTMLLabelElement): void {
        if (markdown.value) {
            markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
        } else {
            markdownOutput.innerHTML = '<p></p>';
        }
    }
    public TextChangeHandler(id: string, output: string): void {
        let markdown = <HTMLTextAreaElement>document.getElementById(id);
        let markdownOutput = <HTMLLabelElement>document.getElementById(output);
        if (markdown !== null) {
            markdown.onkeyup = (e: KeyboardEvent) => {
                this.RenderHtmlContent(markdown, markdownOutput);
            }
            window.onload = (e: Event) => {
                this.RenderHtmlContent(markdown, markdownOutput);
            }
        }
    }
}

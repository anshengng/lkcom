declare namespace toastui {
    class Editor {
        constructor(options: any);
        getMarkdown: () => string;
        getHTML: () => string;
        on: (type: string, callback: Function) => void
        removeHook: (type: string) => void
        addHook: (type: string, callback: Function) => string
        setHeight: (height: string) => void
        focus: () => void
    }
}


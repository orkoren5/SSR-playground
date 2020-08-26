import { createContext } from "preact";

interface IStyleContext {
    insertCss: (styles: string[]) => () => void
}

const StyleContext = createContext<IStyleContext>({
    insertCss: null,
});

export default StyleContext

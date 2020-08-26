import StyleContext from './StyleContext'
import { useContext, useEffect } from "preact/hooks";

// To detect if it's in SSR process or in browser. Wrapping with
// the function makes rollup's replacement of "this" avoidable
// eslint-disable-next-line func-names
const isBrowser = (function() {
    return typeof window === 'object'
})();

function useStyles(...styles) {
    const { insertCss } = useContext(StyleContext);
    if (!insertCss) throw new Error('Please provide "insertCss" function by StyleContext.Provider');
    const runEffect = () => {
        //@ts-ignore
        const removeCss = insertCss(...styles);
        return () => {
            setTimeout(removeCss, 0)
        }
    };
    if (isBrowser) {
        useEffect(runEffect, []);
    } else {
        runEffect()
    }
}

export default useStyles
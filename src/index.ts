export function interpret(program: string, identifiers: Intendifires = {}){
    identifiereMap = identifiers
    setInput(program)
    getNextToken();
    tree: Node = undefined;
    MainLoop();
}

function MainLoop()
{
    while (true)
    {
        switch (CurTok)
        {
        case Token.tok_eof:
            return;
        default:
            evaluateNext()
            break;
        }
    }
}
let identifiereMap: Intendifires = {}
let tree: Node = undefined;
let acc = 0;

function evaluateNext(): Node{
    let data = getTokenElement()
    if(data.token == Token.tok_number){
        return addToTree(data)
    }
    if(data.token == Token.tok_identifier&&data.str){
        return identifiereMap[data.str] || 0
    }
}
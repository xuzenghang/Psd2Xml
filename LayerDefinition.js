
#include "./Utils.js"

function Text(layer)
{  
    var indent = repeatString(INDENT,layer._Depth );
    var indentProperty = indent + INDENT_PROPERTT;
    
    return indent + formatType("TextItem",layer.name) + "\n"
    + UIInfo(layer) + "\n"
    + indentProperty + formatString(layer) + "\n"
    + indentProperty + formatFontSize(layer) + "\n"
    + indent + "</Window>" + "\n";
}

function Shape(layer)

{   var indent = repeatString(INDENT,layer._Depth );
    var indentProperty = indent + INDENT_PROPERTT;
    return indent + formatType("Shape",layer.name) + "\n"
    + UIInfo(layer) + "\n"
    + indent +"</Window>" + "\n";
}   


function NormalLayer(layer)
{
    var indent = repeatString(INDENT,layer._Depth );
    var indentProperty = indent + INDENT_PROPERTT;
    return indent + formatType(layer.kind,layer.name) + "\n"
    + UIInfo(layer) + "\n"
    + indent + "</Window>" + "\n";
}

function UIInfo(layer)
{   
    var indentProperty = repeatString(INDENT,layer._Depth ) + " ";
    return indentProperty + formatPosition(layer) + "\n"
    + indentProperty + formatZorder(layer) + "\n"
    + indentProperty + formatContentSize(layer);
}

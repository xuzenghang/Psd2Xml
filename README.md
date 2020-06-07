# Psd2Xml
Traverse  psd document and save as XML format.
Layers all have some basic propertys:
* Layer Type ( Text,Shape,Normal Layer,etc.)
* Position relative to its parent container(folder)
* Content size (bounding box)
* Order in hierachy relative to its parent container

Some kind of layer has its unique propertys. For example,text layer has propertys such as:
* String content
* Font size
* Font color 

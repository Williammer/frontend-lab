module.exports = function(babel) {
    var t = babel.types;

    function moriMethod(name) {
        var expr = t.memberExpression(
            t.identifier('mori'),
            t.identifier(name)
        );

        expr.isClean = true;
        return expr;
    }

    return {
        visitor: {
            ArrayExpression: function(path) {
                path.replaceWith(
                    t.callExpression(
                        moriMethod('vector'),
                        path.node.elements
                    )
                );
            },
            ObjectExpression: function(path) {
                var props = [];

                path.node.properties.forEach(function(prop) {
                    props.push(
                        t.stringLiteral(prop.key.name),
                        prop.value
                    );
                });

                path.replaceWith(
                    t.callExpression(
                        moriMethod('hashMap'),
                        props
                    )
                );
            },
            AssignmentExpression: function(path) {
                var props = [
                    path.node.left.object,
                    t.stringLiteral(path.node.left.property.name),
                    path.node.right
                ];

                path.replaceWith(
                    t.callExpression(
                        moriMethod('assign'),
                        props
                    )
                );
            },
            MemberExpression: function(path) {
            	if(path.node.isClean) return;
                if (t.isAssignmentExpression(path.parent)) return;

                path.replaceWith(
                    t.callExpression(
                        moriMethod('get'), [path.node.object, t.stringLiteral(path.node.property.name)]
                    )
                );
            }
        }
    };
};

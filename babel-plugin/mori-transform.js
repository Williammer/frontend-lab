module.exports = function(babel) {
  const t = babel.types;

  function moriMethod(name) {
    let expr = t.memberExpression(
      t.identifier('mori'),
      t.identifier(name)
    );

    expr.isInner = true;
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
        let props = [];

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
        let props = [
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
        if (path.node.isInner) return; // escape moriMethod call
        if (t.isAssignmentExpression(path.parent) || t.isCallExpression(path.parent)) return;

        path.replaceWith(
          t.callExpression(
            moriMethod('get'), [
              path.node.object,
              t.stringLiteral(path.node.property.name)
            ]
          )
        );
      },
      CallExpression(path) {
        const callee = path.node.callee;

        if (t.isMemberExpression(callee)) {
          if (callee.isInner) return; // escape moriMethod call

          path.replaceWith(
            t.callExpression(
              moriMethod('call'), [
                callee.object,
                callee.property,
                ...path.node.arguments
              ]
            )
          );

        } else {
          path.replaceWith(
            t.callExpression(
              moriMethod('call'), [
                callee,
                ...path.node.arguments
              ]
            )
          );
        }
      }
    }
  };
};

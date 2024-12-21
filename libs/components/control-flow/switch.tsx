import React from "react";

/**
 * Komponen `Switch` adalah komponen yang digunakan untuk membuat percabangan kondisi.
 * @example
 * ```tsx
 * function App() {
 *     const [role, setRole] = React.useState('Admin');
 * 
 *     return (
 *         <Switch value={role} default={<div>Guest</div>}>
 *             <Case when={'Admin'}>
 *                 <div>Admin</div>
 *             </Case>
 *             <Case when={'User'}>
 *                 <div>User</div>
 *              </Case>
 *         </Switch>
 *    );
 * }
 * ```
 */
function Switch<const T>(props: {
    value: T,
    default?: React.ReactNode,
    children: React.ReactNode
}) {
    const matchedChild = React.useMemo(() => React.Children.toArray(props.children).find((child) => 
        React.isValidElement(child) && child.type === Case && (child.props as { when: T }).when === props.value
    ),[props.value, props.children]);

    return <>{matchedChild || props.default}</>;
}

function Case<const T>(props: {
    when: T,
    children: React.ReactNode
}) {
    return <>{props.children}</>;
}

export { Switch, Case };
export default Switch;
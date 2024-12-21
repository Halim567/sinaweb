/**
 * Komponen If adalah komponen kondisional yang akan merender `children` jika `condition` bernilai true,
 * dan akan merender `otherwise` jika `condition` bernilai false.
 * @example
 * ```tsx
 * function App() {
 *    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
 * 
 *    return (
 *        <If condition={isLoggedIn} otherwise={<div>Silahkan login terlebih dahulu</div>}>
 *            <div>Anda sudah login</div>
 *        </If>
 *    );
 * }
 * ```
 */
export default function If<T>({ condition, children, otherwise }: { condition: T | undefined | null | false; children: React.ReactNode; otherwise?: React.ReactNode }) {
    return condition ? children : otherwise
}
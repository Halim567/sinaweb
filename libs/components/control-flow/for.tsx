import { Fragment } from "react";

interface ForEachProps<T> {
    readonly items: readonly T[];
    fallback?: React.ReactNode;
    render: (value: T, index: number) => React.ReactNode;
}

/**
 * Komponen ForEach adalah komponen yang digunakan untuk merender daftar elemen berdasarkan array nilai yang diberikan.
 * @example
 * ```tsx
 * function App() {
 *     const items = ['Apple', 'Banana', 'Cherry'];
 * 
 *     return (
 *         <ForEach items={items} fallback={<div>Belum ada item</div>} render={(item, index) => (
 *             <div key={index}>{item}</div>
 *         )}/>
 *     );
 * }
 * ```
 */
export default function ForEach<const T>({ items, fallback, render }: ForEachProps<T>) {
    if (items.length === 0 && fallback) {
        return <>{fallback}</>;
    }

    return (
        <>
            {items.map((value, index) => (
                <Fragment key={index}>
                    {render(value, index)}
                </Fragment>
            ))}
        </>
    );
}
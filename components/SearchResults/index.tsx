import { useMemo } from "react";
import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "../ProductItem";

interface SearchResultsProps {
    results: Array<{
        id: number;
        price: number;
        title: string;
    }>;
    onAddToWishList: (id: number) => void;
}

export function SearchResults({
    results,
    onAddToWishList,
}: SearchResultsProps) {
    const totalPrice = useMemo(() => {
        return results.reduce((total, product) => {
            return total + product.price;
        }, 0);
    }, [results]);

    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem
                    product={results[index]}
                    onAddToWishList={onAddToWishList}
                />
            </div>
        );
    };

    return (
        <div>
            <h2>Total price: {totalPrice}</h2>
            <List
                height={300}
                rowHeight={25}
                width={900}
                overscanRowCount={10}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />
        </div>
    );
}

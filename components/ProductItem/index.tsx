import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishListProps } from "../AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(
    () => {
        return import("../AddProductToWishList").then(
            (mod) => mod.AddProductToWishList
        );
    },
    {
        loading: () => <span>Loading...</span>,
    }
);

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
    };
    onAddToWishList: (id: number) => void;
}

function ProductItemBase({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishList, setIsAddingToWishList] = useState(false);

    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>
                Add to wish list
            </button>
            {isAddingToWishList && (
                <AddProductToWishList
                    onAddToWishList={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    );
}

export const ProductItem = memo(ProductItemBase, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
});

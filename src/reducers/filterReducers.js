export const filterReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case "PRODUCT_LIST":
            return { ...state, productList: payload.products };

        case "BEST_SELLER_ONLY":
            return { ...state, bestSellerOnly: payload.bestSellerOnly };

        case "ONLY_IN_STOCK":
            return { ...state, onlyInStock: payload.onlyInStock };

        case "SORT_BY":
            return { ...state, sortBy: payload.sortBy };

        case "RATING":
            return { ...state, rating: payload.rating };

        case "CLEAR_FILTER":
            return {
                ...state,
                onlyInStock: false,
                bestSellerOnly: false,
                sortBy: null,
                rating: null
            };

        default:
            throw new Error("No Case Found!")
    }
}
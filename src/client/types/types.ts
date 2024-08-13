export interface ProductProps {
    id: number;
    title: string;
    star: number;
    price: number;
    image: string;
    images: string[];
}

export interface CarouselProps {
    id: number;
    src: string;
    height: string;
    loading: string;
    sizes: string;
    alt?: string;
}

export interface CollectionProps {
    id: number;
    title: string;
    description: string;
    image: string;
    products: ProductProps[];
}

export interface CartProps {
    description: string;
    image: string;
    price: number;
    quantity: number;
    title: string;
}
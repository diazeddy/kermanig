import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CollectionProps } from "../types/types";
import axios from "axios";

import './CollectionDetailPage.css';

const PAGE_SIZE = 3;

const CollectionDetailPage: React.FC = () => {
    const history = useNavigate();
    const { key } = useParams();
    const [data, setData] = useState<CollectionProps | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/collections/${key}`);
            setData(response.data);
            const pages = Math.ceil(response.data.products.length / PAGE_SIZE);
            setTotal(pages);
            setPage((prev) => (page > prev ? prev : page));
        };
        if (key) {
            fetchData();
        }
    }, [key]);

    const onClickNext = () => setPage((prev) => (prev < total ? prev + 1 : total));
    const onClickPrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <>
            {!data && <h1>Loading collection details...</h1>}
            {data && (
                <div className="flex flex-col w-full justify-between">
                    <p className="font-bold">{data.title}</p>
                    <p>{data.description}</p>
                    <div className="flex flex-row w-full items-center justify-between px-5">
                        {data.products
                        ?.filter(
                        (_, index) =>
                            index >= (page - 1) * PAGE_SIZE && index < page * PAGE_SIZE
                        )
                        .map((product) => {
                        return (
                            <div className="flex flex-col items-center justify-content">
                                <img
                                    src={product.image}
                                    className="cursor-pointer"
                                    onClick={() => history(`/products/${data.title}`)}
                                />
                                <p>{product.title}</p>
                                <p className="font-bold">${product.price} USD</p>
                            </div>
                        );
                        })}
                    </div>
                    <div className="paginaion-bar">
                        <div>{page}</div>
                        <div>/</div>
                        <div>{total}</div>
                        <button onClick={onClickPrev}>Prev</button>
                        <button onClick={onClickNext}>Next</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CollectionDetailPage;
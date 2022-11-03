import React from "react";
import { useGetStuffQuery } from "./api";

export default () => {
    const { data, isLoading, isError, error } = useGetStuffQuery('testing');
    if (isLoading) {
        return <p>Loading</p>
    } else if (isError) {
        return <p>Error {`${error}`}</p>;
    } else {
        return <p>Data {data}</p>;
    }
}

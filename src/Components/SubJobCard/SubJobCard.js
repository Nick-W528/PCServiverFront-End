import { useEffect, useState } from "react";
import axios from "axios"

function SubJobCard(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const client = axios.create({
        baseURL: "http://localhost:8800/"
    });

    useEffect(() => {
        client.get("subjobs/" + props.id).then((res) => {
            setData(res.data);            
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
            })
    }, [props.id])

    return (
        <div>
            {loading ? (
                <p>loading data...</p>
            ) : (
                <div>
                    {data.map((item, key) => (
                        <div className="sub-job-card-wrapper" key={key}>
                            <h2>{item.name}</h2>
                            <p>{item.status}</p>
                            <p>{item.type}</p>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default SubJobCard
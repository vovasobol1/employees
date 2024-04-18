import {useNavigation, useParams} from "react-router-dom";
import {useState} from "react";


export const Employee = () => {
    const navigate = useNavigation()
    const [error , setError] = useState('')
    const params = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div>
            employee
        </div>
    )
}
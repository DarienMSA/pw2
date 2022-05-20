import { useAuth0 } from '@auth0/auth0-react'
import React, { Fragment, useEffect, useState } from 'react'
import FromMessage from './FromMessage'
import ToMessage from './ToMessage'

export default function DisplayMessage(props) {
    const { user, isLoading } = useAuth0()
    const [type, setType] = useState("")

    useEffect(() => {
        if (!isLoading) {
            const isFrom = props.msg.from.email === user.email ? "from" : "to"
            setType(isFrom)

        }
    }, [isLoading])

    if (!Object.keys(type).length) return (<h1></h1>)

    return (
        <Fragment>
            {type === "to" ? <ToMessage msg={props.msg} /> : <FromMessage msg={props.msg} />}
        </Fragment>


    )
}

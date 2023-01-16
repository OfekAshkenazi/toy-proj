export function MsgPreview({ msg, user }) {
    if (!msg) return


    function _getUserNameForMsg(user) {
        if(!user) return 'user?'
        return msg.by.fullname === user.fullname ? 'Me' :  msg.by.fullname
    }

    return (
        <article className="space-bet flex">
            <h4>{_getUserNameForMsg(user)}</h4>
            <p>{msg.txt}</p>
        </article>
    )
}
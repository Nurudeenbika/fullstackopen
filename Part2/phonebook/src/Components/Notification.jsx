const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className="notification" style={{ color: notification.error ? "red" : "green" }}>
            {notification.text}
        </div>
    )

}

export default Notification;
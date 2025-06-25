function Loading(props) {
    return (
        <div className="loading">
          <h4>{props.msg}</h4>
          <div className="loading-spinner"></div>
        </div>
    );
}

export default Loading;
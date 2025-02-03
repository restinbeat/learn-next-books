function Loading() {
  return <div>Loading...</div>;
}

export default Loading;

// async page component 에서만 스트리밍 제공함
// 쿼리스트링만 변경되는 경우에는 스트리밍 되지 않는다

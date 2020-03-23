export default function(success, fail) {
  return function(response) {
    let data = response.data;
    if (data.resultCode === '100') {
      success(data);
    } else {
      fail(data);
    }
  };
}

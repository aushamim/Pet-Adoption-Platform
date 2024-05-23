const handleSubmit = (e) => {
  e.preventDefault();
  const image = e.target.elements["image"].files[0];
  if (image) {
    const formData = new FormData();
    formData.append("image", image);

    fetch("https://api.imgbb.com/1/upload?key=DELETED", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  //   console.log(image);
};

const Playground = () => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
        <input
          id="image"
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <input className="btn-purple" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default Playground;

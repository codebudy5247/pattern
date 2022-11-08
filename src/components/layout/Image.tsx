const Image = (props: any) => {
  
  return (
    <>
      <div>
        <img
          className="object-contain h-10 w-10 ..."
          src={props?.preview}
          alt=""
        />
      </div>
    </>
  );
};

export default Image;

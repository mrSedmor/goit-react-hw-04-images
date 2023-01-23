import { MagnifyingGlass } from 'react-loader-spinner';

export default function Loader() {
  return (
    <MagnifyingGlass
      height="60"
      width="60"
      ariaLabel="MagnifyingGlass-loading"
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#0000001b"
      color="#000000"
    />
  );
}

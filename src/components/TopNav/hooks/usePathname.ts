interface IProps {
  pathnames: string;
}

const usePathname = (props: IProps) => {
  const { pathnames, ...rest } = props;
  const pathname = pathnames
    .substring(1)
    .split('/')
    .filter((item, index) => index !== 0);
  return {
    pathname,
  };
};

export default usePathname;

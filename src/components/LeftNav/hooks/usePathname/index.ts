interface IProps {
  pathnames: string;
}

const usePathname = (props: IProps) => {
  const { pathnames, ...rest } = props;
  const pathname = pathnames.substring(1).split("/");

  return {
    pathname,
  }
}

export default usePathname

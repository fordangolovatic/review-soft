import useRoles from '../../services/hooks/useRoles';


const Forum = () => {
  // eslint-disable-next-line no-unused-vars
  const { roles, error, loaded } = useRoles()
  // eslint-disable-next-line no-console
  console.log(roles)
  const title = 'Forum Page';
  return <div>{title}</div>;
};

export default Forum;

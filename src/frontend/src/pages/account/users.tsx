import React, { useEffect } from 'react'
import useGlobalStore, { PageEnum } from '../../store/global';

const Users = () => {
  const { SetCurrentPage } = useGlobalStore();
  useEffect(() => {
    SetCurrentPage(PageEnum.Users);
  }, []);
  
  return (
    <div>Users</div>
  )
}

export default Users
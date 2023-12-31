import React, { useEffect } from 'react'
import useGlobalStore, { PageEnum } from '../../store/global';

const Settings = () => {
  const { SetCurrentPage } = useGlobalStore();
  useEffect(() => {
    SetCurrentPage(PageEnum.Settings);
  }, []);
  
  return (
    <div>Settings</div>
  )
}

export default Settings
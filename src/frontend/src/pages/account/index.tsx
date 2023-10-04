import { useEffect } from "react"
import useGlobalStore, { PageEnum } from "../../store/global";

const Account = () => {
  const { SetCurrentPage } = useGlobalStore();
  useEffect(() => {
    SetCurrentPage(PageEnum.Account);
  }, []);
  return (
    <div>
      Account
    </div>
  )
}

export default Account
import chefClaudeLogo from "./assets/chef.png"
export default function Header(){
    return(
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Chef Claude</h1>
        </header>
    )
}
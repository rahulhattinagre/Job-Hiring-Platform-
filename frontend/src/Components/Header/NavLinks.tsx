
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks=()=>{
    const user = useSelector((state: any) => state.user);
    const accountType: string = user?.accountType || "";

    const links=[
        {name:"Find Jobs",    url:"find-jobs",    roles:["APPLICANT","ADMIN"]},
        {name:"Find Talent",  url:"find-talent",  roles:["EMPLOYER","ADMIN"]},
        {name:"Post Job",     url:"post-job/0",   roles:["EMPLOYER","ADMIN"]},
        {name:"Posted Jobs", url:"posted-jobs/0", roles:["EMPLOYER","ADMIN"]},
        {name:"Job History", url:"job-history",   roles:["APPLICANT","ADMIN"]}
    ];

    const visibleLinks = accountType
        ? links.filter(link => link.roles.includes(accountType))
        : [];

    const location = useLocation();
    return <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
        {visibleLinks.map((link, index) =>
            <div key={index} className={`${
                location.pathname === "/" + link.url
                    ? "border-bright-sun-400 text-bright-sun-400"
                    : "border-transparent"
            } border-t-[3px] h-full flex items-center`}>
                <Link className="hover:text-mine-shaft-200" key={index} to={link.url}>{link.name}</Link>
            </div>
        )}
    </div>
}
export default NavLinks;
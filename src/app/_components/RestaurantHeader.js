"use client"

import Link from 'next/link'
import { useRouter,usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const RestaurantHeader =()=>{
    const [details, setDetails] = useState()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
        let data = localStorage.getItem("RestaurantUser");
        console.log(data);
        if(!data && pathname == "/restaurant/dashboard"){
router.push("/restaurant")
        }
        else if(data && pathname == "/restaurant"){
router.push("/restaurant/dashboard")
        }
        else{
            setDetails(JSON.parse(data))
        }
    },[])

    const handleLogout =()=>{
        localStorage.removeItem("RestaurantUser")
        router.push("/restaurant")
    }
    return(
        <>
        <div className='header-wrapper'>
            <div className="logo">
                <img style={{width:100}} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAAD7+/v5+fnU1NTo6Oi0tLTj4+P29vbe3t7W1tbx8fH09PTs7OzKyso/Pz+pqalnZ2e6urqgoKBRUVGlpaV1dXV+fn5YWFjDw8NHR0eHh4eRkZFtbW22trZNTU0wMDAqKioNDQ0jIyNycnIXFxeNjY07OzuZmZkcHBwvLy9XV1cTExOk5pyYAAAMH0lEQVR4nO2c6XqySgyAAREBy66yuC8VrN7/9Z1JMiDutsXKd568P1rFASazJJlMQFEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhnkC7d0VeCW9IlEFX6Ow8+6qvIQ0U4/EvXdXp3EsTz0l6L67Ss0yVC8Zv7tSTRLXBMsHg7I/9XfXqzG2pXQD30Jdqln+Hr4XD091bN1NXd1qtwoOpXzbfv1oxxCqZ3r7LE0fThe1vk8i69UV/Sl9qqF3qVqsQE1unOMnV2buwn9xVX9IQF1w9Td7d60XZ4Mr4hFtlNHCmmW3fo7P69wd3xQPFZXz4vp+nylW7Ha9jJOfrOld+QD35VX+HjQLozslai6cFZyLs/aCOI6DbNdeEX2sVPU16N8u2j3rv6lvf1Q/OuFR97RLqWK9JtVXQ73lrXVHdem+CvuiRL90HFatso5YpaOfranqZdUFzol88Y1eslfy95dU9Wf0oELL2oHJNY1/ol+WdyyCuaQyLXLbU6jPpnZAE92QnGrWdF6Tz0vvXk+6D6MXVPWH4KJiWD/iwpFtJaM1WdXkGzx0xqUL2J419ORSveMhdV6kruvHdSugBs8oSVqYGK+p7g+Ir2j3+lqqxvi5yUWdGLygrj9jdKpKiehSvOz5TqETmq3mLxhf1XxWfiLe5+Q7YRvye1oT6Clu1MYt/bPVt9d95CXdV7l/yPDKPCQ0Kw1T9wcrBRslvOfp/ilu8+1NJnHb6DV/QbfW3k05zChhexy3mmpvan2OEm4el/sjQKPs6KPfkP5rmUE0jqrGbUg7tGyU9o9qwbkZrPke7dI00kDjJ7MZR0Rrl7WQ5ovqg2H8X0dZKHjXpmANrv5M+LRGQce/tBo4s+8E7/4ebHMM/OakAOPRx90THoDxgM8GKtYcuDETig9zGc4I1fHPu4CmYYsW+cCXXGDsVRkk+0jUJDSvFXWs2TAO9t5ine/jq96e0bppqEjXbakJtVpNQTfHZb5TxQVNKy3i843i9ZWgxif8cPibij8P+t+ZkLDWKy5FeNfZfDDPluoNLkKPRdtshQSHVpCc1swZZrcEqzgP/pKpaM8K/wgtWy/27k032hzFPHjBJp74M7FudN3UwE4+ddc7ByzYnjhUjZlaGY0rmOa18CCEQBb1Ax3aFL6xrfpu5Fz8FnBKTeX2v6irr2rhFuAI9bn+3imTE13jysHcmiDUBcJWr753hluTUCvDrFd3dtpB/9sSOsce89XW9yCuMo4SatoTm4CanIdOUco3/5VL+2qEOj2ExSiZ52vajVktsyQe3osoCgdGsYbHvan2WfoTbidZTI0bUnpqfWcqaNOS6Rq1bcLdXpj2yPf9YjxK1nAkL65tzNR3FpMWqxgJVPMrKELrYi710onwbBbGxdTcl+ItJ23vP4XCGXcyLjuuMAfbM2NO3nkwbFf2xS1gT212v4g+UuOTDk5Uv9dq7XkCJKs93MTW/N2k9nWg/jvyKR0Yb+VE63z0+7e8yzA7riLn7YrH3AeyMjxFn21HxxSu9T6O0ksdOovLzKm8pcuIq4BbWTduNfYT90yLDmUc5jC5vFBruSFdyWB40pfS+2zPVu9jenVxdsEIlvKCmT+Jp3JX3xueqxVNvZPo1zbk8wj5JnKvOC+mbYwhmpGcRgmdNgZkbjFXDxtfv5vKpNnRXP2sx2D09uwSPsZ9cryl089jkljYxrTuBkjjUH4q/g1v7Qf0pfX4Xz04dJWWL3gboJWRX4ZhGIa5jeY4rXpWp2GcCW5deuHjoldJY++AWQy657Usj4SAbb48tNJn8+m0vm7UfGrKH4GloKmqa03R8/WtpoIz37D5BEtXTIYcPvlAEshT1bOfqUGBUSoMODqUEkQNoNmnC0qM1/198BuSYGh/3n8Y8kVs2WNIFzoe9my2mEliyXQL4ZF2c/U86QJ2TL+5jdwAUDsZ1UwouesRsNlZRgm1HXyERgpBcgw8yS6GwTs4PTNS7z7g/howwkRyQZWeeeIKnqMpo4RbEIYGn7aSqSXdaaKfFZNArupQ+WOgHjIHyyzGT2kB0LtlxAnTSWy8RnK2b1MvJvl8ZmOgadTLllaM5KBmsnKdIju+yMTZDrwA55mMG2qYkg7DduqXyemjIBB9aOK20wBT8o39Cq/n4AT29/NxGXaM5qKMmLt2EgQjZTIYNB9B1tWLZv0ADbGUOROoVdZyw4LMAnRE9VQp5lFuxJFAncvToUxX+cDBERl0vV0MOhQ2BhaYQkXqxloJKzWFi4MyznCntfFtAEyRkGE0PU2FrBrcyBYKCFQC9NfyQ8lxhoGAmVPTvQqoz72iUCrXNppVbSavjL0qGks1xV9DvkEEdz1ghDhkY+ButM+4eoUxAWNfJlis0CyCNvBBxcLhTzJtc/gBczC1c3XRMyidP4Npt+5Q6Bgkg2Lw7pMpaTIQCvbnDiaKDPGNHC+uga6CNsrIkja9Fw4SygdGelgVnYwH/LP8jGorlPzAjtYkunIxrl06JSbJp1KyNfWURTfo5FM6M6QSKQ2JAPe0qPEsUk5NPwRdHFXpFofIniqIGVpfUhjMhlnI0Vd25ek1RnRKTN1eapUOiVM+NyWvsCQ5liToUtwupPGqyQKNElbzkC6Ppg1sxkhoA70UfykkKK01nLE4uUZCnQt6ZEJDtk/fFkrdhcNOA3VEcvToXwKHxtQ4lizQKI4cOWQYA3o6Hb7uxZdxqVNg+OVykG7V80d6VjR7CrxS6ZhNjh1bdkuMTYDtJk3MrqBrwWyYURM8fm3Rd4HZ/+nIdKAIKwYKW4N7efKONozVUgvM1TPvtSvHY4KjXA5ZHO0++Wllt+Q0LCP6BZ8wPtDbF+TAGamvSHGntGQxyeY45wLZQymMrU8pzLhUBt1jbeyqKrVJtKwkU+TojNXqMTUcLg4pWYuaVnZYaWA+qan0ht0emfWZgkr4wI4ACT01p+EX4qpvTNOmK2sjFM0xkxl6f1wpmh11dSiLTcuBrnRAs4CLvyRx8kpCvPQA74N6/Sn3/zuY/mYT9RXSDDBQMpxTKSn8CQ6/PmkQYfvW1N7FUed51NMTbI4ODWbaMZaC5lDKQnMeyDWiSa5GQE28ovtI3TN+wbYq6P4edQFWaZ/QXMKcV9jDhv5a02heQCcd1keLqMlhO6fBt5PF4N9qqaKPFhjDQB2NVLIbKOoS/EJxF0N4plFGExSH8W7XeBcq6Q5kM+Sck5n36DHL13SQByNfaCFfMnPcc6lbObt84cJCoZz1oMrdKypPgVIc91Xqwwx/AYtFL9Bq/NlLtA+qFcu7KJF32JXb8eZ4sVpv5JIqXairjSlqmHtxzfGYLTzwV1CJehqK6AlV0xfjYA8L4onwGxZjR4xvz1vgHeKD+iUazYzFsPCKjqIvvRz1rRn8Ihp2G9H2M3sEIYeHxvb+8thOdVoUSYenSiLuXIQpOw9/aRCHBmFffS6C8Q/SJyPrvyNE9EdkoFX66v/pTZZnCGdlH6stehVH85jFfJdt/4Ek5UZxDcNAi2CJD75QcC4pOcoiSYfQ4SYOa8f30Xm2wRCgkQmjlFRkzzdCAwOMOrWfOzQ+FA2PdhUTrvy+fJu5bbsb8BqLoa3rWvWuvUTYQ9MzLEPM3R6YZiPQ7REEyLaw7oAAcBB2fTKnfd2dW9gMHlrxaNtNhcC6ldt6X+kFlq6/b+RgrHokKh1J/TMlUxcICafSA+gJd9vBgrEoNAEJYd2V1y7ToWWFkY6ggaoH35Ly9DeCFbe2ijIcRQXYyZqEniwDVZyFZcFKwigxqhQ4M5BXgxKK7kXUOHv4082iqPnl7tOghLaoQGT0LJiQNyQM0T/Vi5qEipYmpddKErpjx6Ge1WP0d1HC3rRnvTHtDSVMesdRuiFNAxKOQc1oJGHHKwvOQKWU43Av/5OEwTCKxjJLESaylPC9o3Tu+9EcJCli8UmMuqDwh2JEJtCVQWyMR1LT6NnQH+BQ3Rd+JvpRm0ezaen/mdCpNqoZ0Ymj7WyLn7EhepnvD9/nZfR0nUaQowtMPABHaB51MU1YowWGXmax29KiWLVUVCjfxcNdE87rVUcVTShpvUVviGQYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmHaz38+WpQ1gJ701QAAAABJRU5ErkJggg=='/>
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && details.name ?  <>
                   
                    <li>
                    <Link href="/restaurant/dashboard">Profile</Link>
                </li>
                <li>
                    <button onClick={()=>handleLogout()}>Logout :{details.name}</button>
                </li>
                    </>  :  <li>
                    <Link href="/restaurant">Login/SignUp</Link>
                </li>
                }
               
              
            </ul>
        </div>
        </>
    )
}

export default RestaurantHeader
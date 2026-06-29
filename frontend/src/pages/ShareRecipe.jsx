import { useParams } from "react-router-dom";

function SharedRecipe(){

const {id}=useParams();

return(

<div
style={{
padding:"40px"
}}
>

<h1>
Receta Compartida
</h1>

<p>
ID: {id}
</p>

</div>

);

}

export default SharedRecipe;
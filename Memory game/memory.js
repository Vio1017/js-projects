// image container
let images = document.querySelector(".images");

//array of 20 elements from 0 -> 19
let imagesArray = Array.from({length :20}, (_,i)=>i);
// imagesArray.sort(()=> 0.5 - Math.random()) //quick shuffle 


function FisherYatesShuffle(array){
  for( let i = array.length-1 ; i > 0; i--){
    let j = Math.floor(Math.random() * ( i + 1 ));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};
imagesArray = FisherYatesShuffle(imagesArray);

//create 20 hidden images
for(let i = 0; i < 20; i++){
  let image = document.createElement("img");
  image.src = "images/hide.jpeg";
  images.appendChild(image);
};


let indexArray = [];
let clicked = [];
let matched = new Set();
let wrongTries = 0;

let imgElements = document.querySelectorAll(".images img");

imgElements.forEach((img, index)=>{
  img.addEventListener("click", (e)=>{
    if(clicked.includes(e.target)) return;
    if(matched.has(e.target)) return;
    if(clicked.length < 2){
      clicked.push(e.target);
      console.log(imagesArray[index])
      e.target.style = "transform : rotateY(-180deg);transition: 2s;";
      setTimeout(()=>{e.target.src = `images/${imagesArray[index]}.jpeg`;},600);
  
      indexArray.push(imagesArray[index]);
      // console.log(imagesArray[index])
  
      if(indexArray.length===2){
        if(Math.abs(indexArray[0]-indexArray[1])!==10){
          wrongTries++;
          document.querySelector(".loses span").innerHTML = `${wrongTries}`;
          console.log("nooo");
          setTimeout(() => {
            clicked[0].style = "transform : rotateY(0deg);transition: 2s;";
            clicked[1].style = "transform : rotateY(0deg);transition: 2s;";
            setTimeout(() => {
              clicked[0].src = "images/hide.jpeg";
              clicked[1].src = "images/hide.jpeg";
              clicked = [];
              indexArray = [];
            }, 600);
          }, 2000);

        }else{
          matched.add(clicked[0]);
          matched.add(clicked[1]);
          console.log("match");
          indexArray = [];
          clicked = [];
        }
      }
    }
  }
  
)
})




export const login = (user)=>{
  return(
    fetch('api/session',{
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    }).then(function(res){
      console.log(res);
      return res.json();
    }).then(function(myJson){
      console.log(myJson);
      return myJson;
    })
  );
};

export const logout = ()=>{
  return(
    fetch('api/session',{
      method: 'DELETE',
    })
  );
};

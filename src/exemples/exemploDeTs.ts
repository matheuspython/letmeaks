interface User  {
  name: string;
  address: {
    city: string;
    uf: string;
  }
}

export default function showWelcomeMessage(user:User) {
  return `Welcome ${user.name} (${user.address.city}) - (${user.address.uf})`
}

showWelcomeMessage({
  name: 'jao',
  address: {
    city: 'Rio do Sul',
    uf: 'SC',
  }
})

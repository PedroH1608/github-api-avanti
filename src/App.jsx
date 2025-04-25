import { useState } from 'react'
import './index.css';
import { getUser } from './services/requestApi';
function App() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (username.trim() === '') {
      alert('Por favor, insira um nome de usuário.');
      return;
    }

    try {
      setLoading(true);
      const data = await getUser(username);
      if (data.message === 'Not Found') {
        setUserData(null);
      } else {
        setUserData(data);
      }

      setSearched(true);
    } catch (error) {
      console.log('Erro ao buscar o usuário:', error);
      setUserData(null);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    };
  }
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  }

  return (
    <>
      <div className='background-shape'><img src="/public/background-1.svg" alt="Background Image" /></div>
      <div className='background-shape-1'></div>
      <div className='background-shape-2'></div>
      <main className='container'>
        <header className='header'>
          <img src="/public/github.svg" alt="GitHub Logo" />
        </header>
        <nav className='search-container'>
          <div className='search'>
            <input type="text" placeholder='Digite um usuário GitHub' value={username} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <button type='button' onClick={handleSearch}>
              <img src="/public/lens.svg" alt="Search Lens" />
            </button>
          </div>
        </nav>

        {loading && <p className='loading'>Carregando...</p>}

        {searched && !loading && (
          userData ? (
            <article className='user-profile'>
              <div className='user-image'>
                <img src={userData.avatar_url} alt="User Profile Image" />
              </div>
              <div className='user-info'>
                <h1>{userData.name || 'Não possui nome'}</h1>
                <p>{userData.bio || 'Não possui uma biografia'}</p>
              </div>
            </article>
          ) : (
            <article className='error'>
              <div>
                <p>Nenhum perfil foi encontrado com esse nome de usuário.
                  Tente novamente</p>
              </div>
            </article>
          )
        )}
      </main>
    </>
  )
}

export default App
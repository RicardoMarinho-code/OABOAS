// Gera um número aleatório entre min e max (inclusivo)
const randomXP = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Lista de nomes e sobrenomes comuns no Brasil
const nomes = [
  'Ana', 'Maria', 'João', 'Pedro', 'Lucas', 'Gabriel', 'Matheus', 'Rafael', 'Gustavo', 'Felipe',
  'Carlos', 'Eduardo', 'Marcos', 'Bruno', 'André', 'Thiago', 'Vinicius', 'Leonardo', 'Rodrigo', 'Diego',
  'Juliana', 'Camila', 'Amanda', 'Bruna', 'Letícia', 'Isabela', 'Laura', 'Larissa', 'Mariana', 'Fernanda',
  'Patrícia', 'Aline', 'Vanessa', 'Tatiane', 'Carolina', 'Bianca', 'Jéssica', 'Natália', 'Priscila', 'Tatiana'
];

const sobrenomes = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Araújo', 'Melo', 'Barbosa', 'Cardoso', 'Dias', 'Cunha',
  'Monteiro', 'Almeida', 'Nascimento', 'Rocha', 'Teixeira', 'Mendes', 'Nunes', 'Moreira', 'Soares', 'Fernandes',
  'Lopes', 'Gonçalves', 'Batista', 'Pinto', 'Ramos', 'Sousa', 'Cavalcanti', 'Correia', 'Moraes', 'Castro'
];

// Gera um nome aleatório
const gerarNome = () => {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome1 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const sobrenome2 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return `${nome} ${sobrenome1} ${sobrenome2}`;
};

// Define o tipo do usuário
interface User {
  name: string;
  xp?: number;
  isCurrentUser: boolean;
  avatar?: string;
  progress?: number;
  streak?: number;
  league?: string;
  isYou?: boolean;
}

// Gera usuários fictícios com nomes brasileiros e pontuações realistas
const generateUsers = (): User[] => {
  const users = Array.from({ length: 50 }, (_, i) => ({
    name: gerarNome(),
    xp: 10000 - (i * 150) + randomXP(-50, 50), // Pontuação decrescente com alguma variação
    isCurrentUser: false,
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`, // Avatar aleatório
    progress: randomXP(20, 95), // Progresso no curso (20% a 95%)
    streak: randomXP(1, 30), // Dias de sequência
    league: i < 5 ? 'Ouro' : i < 15 ? 'Prata' : 'Bronze', // Divisões baseadas na posição
    isYou: false
  }));

  // Adiciona o usuário atual em uma posição aleatória entre os 20 primeiros
  const userIndex = Math.floor(Math.random() * 20);
  const currentUser = users[userIndex];
  if (currentUser) {
    users[userIndex] = {
      ...currentUser,
      name: 'Você',
      isCurrentUser: true,
      isYou: true,
      xp: currentUser.xp || 0,
      avatar: currentUser.avatar || '',
      progress: currentUser.progress || 0,
      streak: currentUser.streak || 0,
      league: currentUser.league || 'Bronze'
    };
  }

  return users;
};

export const fakeUsers: User[] = generateUsers();

export type FakeUser = User;

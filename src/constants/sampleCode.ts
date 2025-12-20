export const SAMPLE_CODE: Record<string, string> = {
  javascript: `// JavaScript Example
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to Monaco Editor\`;
}

const result = greet('World');
console.log(result);`,
  
  python: `# Python Example
def fibonacci(n):
    """Calculate Fibonacci number"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
  
  json: `{
  "name": "Monaco Editor Demo",
  "version": "1.0.0",
  "features": [
    "Syntax Highlighting",
    "Auto-completion",
    "Multiple Languages",
    "Custom Themes"
  ],
  "enabled": true
}`,
  
  typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' }
];

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}`,
  
  N1QL: `-- N1QL Query Example
SELECT hotel.name, hotel.city, hotel.country
FROM \`travel-sample\` hotel
WHERE hotel.type = "hotel"
  AND hotel.country = "United States"
  AND hotel.reviews[0].ratings.Overall >= 4
ORDER BY hotel.name
LIMIT 10;`,
  
  SqlPlusPlus: `-- SQL++ Query Example
SELECT h.name, h.city, AVG(r.rating) as avg_rating
FROM \`travel-sample\` h
UNNEST h.reviews r
WHERE h.type = "hotel"
GROUP BY h.name, h.city
HAVING AVG(r.rating) > 4.5
ORDER BY avg_rating DESC
LIMIT 20;`,
  
  java: `// Java Example
public class HelloWorld {
    private String message;
    
    public HelloWorld(String message) {
        this.message = message;
    }
    
    public void printMessage() {
        System.out.println(message);
    }
    
    public static void main(String[] args) {
        HelloWorld hello = new HelloWorld("Hello from Monaco Editor!");
        hello.printMessage();
    }
}`,
};


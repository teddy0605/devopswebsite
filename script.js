// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { 
            value: 140,  // Increased slightly
            density: { 
                enable: true, 
                value_area: 1000  // Decreased to spread less
            } 
        },
        color: { 
            value: ['#ffffff', '#ffffff', '#ffffff', '#2196f3']  // More white particles
        },
        shape: { 
            type: ['circle', 'edge'],
            stroke: { width: 0, color: '#000000' },
        },
        opacity: {
            value: 0.5,  // Increased opacity
            random: true,
            anim: {
                enable: true,
                speed: 0.8,
                opacity_min: 0.2,  // Increased minimum opacity
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,  // Decreased to create more connections
            color: '#ffffff',
            opacity: 0.2,  // Increased line opacity slightly
            width: 0.8
        },
        move: {
            enable: true,
            speed: {
                min: 0.2,
                max: 1.2
            },
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',  // Changed to bounce to keep particles in view
            bounce: true,
            attract: {
                enable: true,
                rotateX: 1200,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.4
                }
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
});

// Updated typing effect with loop
const titleText = "Teddy Diamandescu";
const subtitleText = "DevOps and Platform Engineering";

function typeWriter(element, text, speed = 150, delay = 3000) {
    let i = 0;
    element.style.opacity = 0;
    element.innerHTML = text;
    
    // Fade in the entire text first
    fadeIn(element, () => {
        // Then start the typing effect
        element.innerHTML = '';
        type();
    });
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            element.appendChild(span);
            
            // Fade in each letter
            requestAnimationFrame(() => {
                span.style.transition = 'opacity 0.3s ease';
                span.style.opacity = '1';
            });
            
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                fadeOut(element, () => {
                    i = 0;
                    element.innerHTML = '';
                    setTimeout(() => typeWriter(element, text, speed, delay), 500);
                });
            }, delay);
        }
    }
}

function fadeIn(element, callback) {
    element.style.transition = 'opacity 1s ease';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.opacity = '1';
        setTimeout(callback, 1000);
    }, 100);
}

function fadeOut(element, callback) {
    element.style.transition = 'opacity 1s ease';
    element.style.opacity = '0';
    setTimeout(callback, 1000);
}

// Start typing animation with delay
setTimeout(() => {
    const titleElement = document.querySelector('.title');
    const subtitleElement = document.querySelector('.subtitle');
    typeWriter(titleElement, titleText);
    setTimeout(() => {
        typeWriter(subtitleElement, subtitleText);
    }, titleText.length * 100 + 500);
}, 1000); 

const codeSnippets = [
    {
        type: 'kubernetes',
        steps: [
            { 
                command: 'kubectl get pods -n monitoring',
                output: `NAMESPACE     NAME                        READY   STATUS    
monitoring    prometheus-k8s-0            3/3     Running   
monitoring    alertmanager-main-0         2/2     Running   
monitoring    grafana-7cf9947897-k8v9d   1/1     Running`
            },
            {
                command: 'kubectl get nodes',
                output: `NAME           STATUS   ROLES    AGE   VERSION
master-1      Ready    master   92d   v1.24.0
worker-1      Ready    <none>   92d   v1.24.0
worker-2      Ready    <none>   92d   v1.24.0`
            }
        ]
    },
    {
        type: 'terraform',
        steps: [
            {
                command: 'terraform init',
                output: `Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v4.15.0...
- Installed hashicorp/aws v4.15.0`
            },
            {
                command: 'terraform plan',
                output: `Terraform will perform the following actions:

  + aws_instance.web
      ami:           "ami-0c55b159cbfafe1f0"
      instance_type: "t2.micro"
      tags: {
        Name = "Production-Server"
      }

Plan: 1 to add, 0 to change, 0 to destroy.`
            }
        ]
    },
    {
        type: 'ansible',
        steps: [
            {
                command: 'ansible-playbook deploy.yml -i inventory',
                output: `PLAY [Deploy Application] ********************************

TASK [Gathering Facts] *********************************
ok: [webserver1]

TASK [Install dependencies] ****************************
changed: [webserver1]

TASK [Start service] **********************************
ok: [webserver1]

PLAY RECAP *******************************************
webserver1 : ok=3 changed=1 unreachable=0 failed=0`
            }
        ]
    },
    {
        type: 'gcloud',
        steps: [
            {
                command: 'gcloud container clusters list',
                output: `NAME         LOCATION      STATUS  MASTER_VERSION  MASTER_IP      MACHINE_TYPE  NODE_VERSION
prod-cluster  us-central1  RUNNING  1.24.8-gke.2  34.68.123.45  e2-standard-4 1.24.8-gke.2`
            },
            {
                command: 'gcloud compute instances list',
                output: `NAME           ZONE           MACHINE_TYPE  STATUS  INTERNAL_IP  EXTERNAL_IP
bastion-host   us-central1-a  e2-medium     RUNNING  10.0.1.10    35.12.34.56
jenkins-master us-central1-b  e2-standard-2 RUNNING  10.0.2.20    35.23.45.67`
            }
        ]
    },
    {
        type: 'linux',
        steps: [
            {
                command: 'df -h',
                output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/root       100G   32G   68G  32% /
tmpfs            16G   12M   16G   1% /dev/shm
/dev/nvme0n1p1  500M  102M  398M  21% /boot`
            },
            {
                command: 'top -b -n 1 | head -n 5',
                output: `top - 14:23:45 up 23 days, 12:44,  1 user,  load average: 0.52, 0.58, 0.59
Tasks: 128 total,   1 running, 127 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.2 us,  2.1 sy,  0.0 ni, 92.5 id,  0.0 wa,  0.0 hi,  0.2 si
MiB Mem:  32102.5 total,  24521.3 used,   7581.2 free,   1234.5 buff/cache
MiB Swap:  2048.0 total,      0.0 used,   2048.0 free,  29234.2 avail Mem`
            }
        ]
    },
    {
        type: 'docker',
        steps: [
            {
                command: 'docker ps',
                output: `CONTAINER ID   IMAGE                COMMAND        STATUS          PORTS
abc123def456   nginx:latest         "/docker-..."   Up 2 hours      80/tcp
def456abc789   redis:latest         "redis-ser..."  Up 3 days       6379/tcp
ghi789jkl012   postgres:13          "docker-e..."   Up 5 days       5432/tcp`
            }
        ]
    },
    {
        type: 'SQL',
        steps: [
            {
                command: 'psql -U admin -d production -c "SELECT count(*) FROM users;"',
                output: ` count  
--------
 156742
(1 row)`
            },
            {
                command: '\\dt',
                output: `            List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | users      | table | postgres
 public | orders     | table | postgres
 public | inventory  | table | postgres`
            }
        ]
    },
    {
        type: 'curl',
        steps: [
            {
                command: 'curl -I https://api.example.com/health',
                output: `HTTP/1.1 200 OK
Date: Mon, 27 Mar 2024 14:25:31 GMT
Content-Type: application/json
Connection: keep-alive
X-Rate-Limit-Limit: 60
X-Rate-Limit-Remaining: 59`
            }
        ]
    },
    {
        type: 'prometheus',
        steps: [
            {
                command: 'curl localhost:9090/api/v1/query?query=up',
                output: `{
  "status": "success",
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {
          "job": "node_exporter",
          "instance": "localhost:9100"
        },
        "value": [1709561731.989, "1"]
      }
    ]
  }
}`
            }
        ]
    },
    {
        type: 'helm',
        steps: [
            {
                command: 'helm list -A',
                output: `NAME            NAMESPACE       REVISION        STATUS          CHART
prometheus      monitoring      2               deployed        prometheus-15.1.3
cert-manager    cert-manager    1               deployed        cert-manager-v1.11.0
ingress-nginx   ingress        3               deployed        ingress-nginx-4.7.1`
            }
        ]
    },
    {
        type: 'git',
        steps: [
            {
                command: 'git log --oneline -n 5',
                output: `a1b2c3d Fix deployment configuration
e4f5g6h Update dependencies
i7j8k9l Implement new feature
m0n1o2p Add unit tests
q3r4s5t Initial commit`
            }
        ]
    },
    {
        type: 'aws',
        steps: [
            {
                command: 'aws ec2 describe-instances --query "Reservations[].Instances[].{ID:InstanceId,Type:InstanceType,State:State.Name}"',
                output: `[
    {
        "ID": "i-0abc123def456",
        "Type": "t3.large",
        "State": "running"
    },
    {
        "ID": "i-0def456abc789",
        "Type": "t3.xlarge",
        "State": "running"
    }
]`
            }
        ]
    },
    {
        type: 'vault',
        steps: [
            {
                command: 'vault secrets list',
                output: `Path          Type         Description
----          ----         -----------
cubbyhole/    cubbyhole    per-token private secret storage
secret/       kv           key-value secrets storage
ssh/          ssh          SSH secret backend
pki/          pki          PKI secret backend`
            }
        ]
    }
];

function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

function showOutput(element, output, speed = 50) {
    return new Promise(resolve => {
        const lines = output.split('\n');
        let i = 0;
        
        function showLine() {
            if (i < lines.length) {
                element.textContent += (i > 0 ? '\n' : '') + lines[i];
                element.scrollTop = element.scrollHeight;
                i++;
                setTimeout(showLine, speed);
            } else {
                resolve();
            }
        }
        showLine();
    });
}

async function runTerminalSequence(terminal, snippet) {
    const content = terminal.querySelector('.terminal-content');
    
    for (const step of snippet.steps) {
        content.textContent += '$ ';
        await typeText(content, step.command);
        content.textContent += '\n';
        await showOutput(content, step.output);
        if (step !== snippet.steps[snippet.steps.length - 1]) {
            content.textContent += '\n';
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

// Add command sequence management
let currentCommandIndex = 0;

function getNextCommand() {
    const command = codeSnippets[currentCommandIndex];
    currentCommandIndex = (currentCommandIndex + 1) % codeSnippets.length;
    return command;
}

// Update createFloatingTerminal function with dynamic sizing
function createFloatingTerminal() {
    const terminal = document.createElement('div');
    terminal.className = 'floating-terminal';
    
    const positions = [
        { top: '15%', left: '5%' },
        { top: '15%', right: '5%' },
        { bottom: '15%', left: '5%' },
        { bottom: '15%', right: '5%' }
    ];
    
    const randomIndex = Math.floor(Math.random() * positions.length);
    const position = positions[randomIndex];
    
    Object.keys(position).forEach(key => {
        terminal.style[key] = position[key];
    });
    
    const snippet = getNextCommand();

    // Set base dimensions based on command type
    const extraWideCommands = ['gcloud', 'aws'];
    const wideCommands = ['kubectl', 'terraform', 'helm'];
    
    if (extraWideCommands.includes(snippet.type)) {
        terminal.style.minWidth = '900px';
    } else if (wideCommands.includes(snippet.type)) {
        terminal.style.minWidth = '700px';
    } else {
        terminal.style.minWidth = '500px';
    }
    
    terminal.innerHTML = `
        <div class="terminal-header">
            <span class="terminal-title">${snippet.type}</span>
            <span class="terminal-buttons">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
        <pre class="terminal-content"></pre>
    `;
    
    document.body.appendChild(terminal);
    
    // Add content and adjust size
    setTimeout(() => {
        terminal.style.opacity = '1';
        runTerminalSequence(terminal, snippet).then(() => {
            // After content is added, adjust terminal size if needed
            const content = terminal.querySelector('.terminal-content');
            const contentWidth = content.scrollWidth;
            const contentHeight = content.scrollHeight;
            
            // Add padding to the calculated dimensions
            const terminalWidth = Math.min(contentWidth + 40, window.innerWidth * 0.9);
            const terminalHeight = Math.min(contentHeight + 60, window.innerHeight * 0.8);
            
            // Set minimum height
            terminal.style.height = `${Math.max(200, terminalHeight)}px`;
            terminal.style.width = `${Math.max(parseInt(terminal.style.minWidth), terminalWidth)}px`;
            
            // Keep terminal visible
            setTimeout(() => {
                terminal.style.opacity = '0';
                setTimeout(() => terminal.remove(), 1000);
            }, 4000);
        });
    }, 100);
}

// Update timing
setTimeout(createFloatingTerminal, 2000); // First terminal still appears after 2 seconds
setInterval(createFloatingTerminal, 8000);  // New terminal every 8 seconds

// Update the terminal styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .floating-terminal {
            position: fixed;
            min-height: 200px;
            max-width: 90vw;
            max-height: 80vh;
            background: rgba(20, 20, 20, 0.95);
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            font-family: 'Courier New', monospace;
            z-index: 3;
            opacity: 0;
            transition: opacity 0.5s ease, width 0.3s ease, height 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        
        .terminal-header {
            background: rgba(60, 60, 60, 0.9);
            padding: 8px;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }
        
        .terminal-content {
            flex: 1;
            overflow: auto;
            padding: 20px;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            white-space: pre;
            font-family: 'Courier New', monospace;
            min-height: 100px;
        }
    </style>
`);
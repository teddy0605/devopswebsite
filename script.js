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
    element.style.opacity = 1;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
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
    type();
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
    
    if (titleElement && subtitleElement) {
        typeWriter(titleElement, titleText);
        setTimeout(() => {
            typeWriter(subtitleElement, subtitleText);
        }, titleText.length * 150 + 500);
    }
}, 1000); 

const codeSnippets = [
    {
        type: 'kubernetes',
        steps: [
            { 
                command: 'kubectl get pods -n monitoring -o wide',
                output: `NAMESPACE     NAME                        READY   STATUS    IP            NODE       AGE
monitoring    prometheus-k8s-0            3/3     Running   10.0.12.65    worker-1   15d
monitoring    alertmanager-main-0         2/2     Running   10.0.12.89    worker-2   15d
monitoring    grafana-7cf9947897-k8v9d    1/1     Running   10.0.12.123   worker-1   15d`
            },
            {
                command: 'kubectl describe deployment nginx-ingress -n ingress',
                output: `Name:                   nginx-ingress-controller
Namespace:              ingress
CreationTimestamp:      Thu, 15 Mar 2024 09:23:45 -0700
Labels:                 app=nginx-ingress
                       tier=frontend
Annotations:           deployment.kubernetes.io/revision: 3
Selector:              app=nginx-ingress
Replicas:              3 desired | 3 updated | 3 available | 0 unavailable
StrategyType:          RollingUpdate
MinReadySeconds:       0
RollingUpdateStrategy: 25% max unavailable, 25% max surge`
            }
        ]
    },
    {
        type: 'terraform',
        steps: [
            {
                command: 'terraform plan',
                output: `Terraform will perform the following actions:

  # aws_eks_cluster.main will be created
  + resource "aws_eks_cluster" "main" {
      + arn                       = (known after apply)
      + certificate_authority     = (known after apply)
      + cluster_id               = (known after apply)
      + created_at               = (known after apply)
      + endpoint                 = (known after apply)
      + id                       = (known after apply)
      + identity                 = (known after apply)
      + name                     = "production-cluster"
      + platform_version         = (known after apply)
      + role_arn                 = "arn:aws:iam::123456789012:role/eks-cluster-role"
      + status                   = (known after apply)
      + version                  = "1.27"

      + vpc_config {
          + cluster_security_group_id = (known after apply)
          + endpoint_private_access   = true
          + endpoint_public_access    = true
          + public_access_cidrs      = [
              + "10.0.0.0/8"
            ]
          + subnet_ids               = [
              + "subnet-abc123def",
              + "subnet-def456ghi"
            ]
          + vpc_id                   = (known after apply)
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.`
            }
        ]
    },
    {
        type: 'helm',
        steps: [
            {
                command: 'helm upgrade --install monitoring prometheus-community/kube-prometheus-stack -n monitoring -f values.yaml --debug',
                output: `preparing upgrade for monitoring
performing update for release=monitoring, chart=prometheus-community/kube-prometheus-stack

HOOKS:
---
# Source: kube-prometheus-stack/charts/kube-prometheus-stack/templates/prometheus/hooks/pre-install-patch.yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: monitoring-kube-prometheus-admission-patch
  namespace: monitoring
spec:
  template:
    spec:
      containers:
        - name: patch
          image: "registry.k8s.io/kubectl:v1.24.0"
          command:
            - kubectl
            - patch
COMPUTED VALUES:
alertmanager:
  enabled: true
  ingress:
    enabled: true
    hosts: 
      - alertmanager.cluster.local
grafana:
  enabled: true
  ingress:
    enabled: true
    hosts:
      - grafana.cluster.local`
            }
        ]
    },
    {
        type: 'ansible',
        steps: [
            {
                command: 'ansible-playbook site.yml --list-tasks',
                output: `playbook: site.yml

  play #1 (all): Configure Base System	TAGS: []
    tasks:
      common : Install required packages	TAGS: [packages]
      common : Configure timezone	TAGS: [timezone]
      common : Setup chrony time synchronization	TAGS: [chrony]
      common : Enable and start chrony	TAGS: [chrony]
      security : Configure SSH settings	TAGS: [ssh]
      security : Setup firewall rules	TAGS: [firewall]
      monitoring : Install node_exporter	TAGS: [monitoring]
      monitoring : Configure prometheus targets	TAGS: [monitoring]

  play #2 (webservers): Configure Web Servers	TAGS: []
    tasks:
      nginx : Install nginx	TAGS: [webserver]
      nginx : Configure virtual hosts	TAGS: [webserver]
      nginx : Setup SSL certificates	TAGS: [ssl]

PLAY RECAP *********************************************************************
webserver1                  : ok=12   changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
webserver2                  : ok=12   changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
dbserver1                   : ok=8    changed=1    unreachable=0    failed=0    skipped=4    rescued=0    ignored=0`
            }
        ]
    },
    {
        type: 'kubectl-2',
        steps: [
            {
                command: 'kubectl get events --sort-by=.metadata.creationTimestamp',
                output: `LAST SEEN    TYPE      REASON              OBJECT                                MESSAGE
2m           Normal    Scheduled           Pod/nginx-7cf9947897-k8v9d         Successfully assigned default/nginx to worker-1
2m           Normal    Pulling             Pod/nginx-7cf9947897-k8v9d         Pulling image "nginx:1.21"
1m           Normal    Pulled              Pod/nginx-7cf9947897-k8v9d         Successfully pulled image "nginx:1.21"
1m           Normal    Created             Pod/nginx-7cf9947897-k8v9d         Created container nginx
1m           Normal    Started             Pod/nginx-7cf9947897-k8v9d         Started container nginx`
            }
        ]
    },
    {
        type: 'docker',
        steps: [
            {
                command: 'docker compose -f production.yml ps',
                output: `NAME                    COMMAND                  SERVICE             STATUS              PORTS
frontend-app-1          "/docker-entrypoint.…"   frontend            running (healthy)   0.0.0.0:80->80/tcp
backend-api-1           "./api-server"           backend             running (healthy)   0.0.0.0:8080->8080/tcp
redis-cache-1           "docker-entrypoint.s…"   redis-cache         running             6379/tcp
postgres-db-1           "docker-entrypoint.s…"   postgres-db         running             5432/tcp`
            }
        ]
    },
    {
        type: 'gcloud',
        steps: [
            {
                command: 'gcloud container clusters describe prod-cluster --format="yaml"',
                output: `name: prod-cluster
location: us-central1
nodePools:
- name: default-pool
  config:
    machineType: e2-standard-4
    diskSizeGb: 100
    imageType: COS_CONTAINERD
  initialNodeCount: 3
  autoscaling:
    enabled: true
    minNodeCount: 3
    maxNodeCount: 10
networkConfig:
  enableIntraNodeVisibility: true
  privateIpv6GoogleAccess: DISABLED
releaseChannel:
  channel: REGULAR`
            }
        ]
    },
    {
        type: 'argocd',
        steps: [
            {
                command: 'argocd app list -o wide',
                output: `NAME          CLUSTER                         NAMESPACE  PROJECT  STATUS  HEALTH   SYNCPOLICY  CONDITIONS
frontend      https://k8s.prod.internal  prod       default  Synced  Healthy  Auto-Prune  <none>
backend       https://k8s.prod.internal  prod       default  Synced  Healthy  Auto-Prune  <none>
monitoring    https://k8s.prod.internal  monitor    default  Synced  Healthy  Auto       <none>
cert-manager  https://k8s.prod.internal  security   default  Synced  Healthy  Auto       <none>`
            }
        ]
    },
    {
        type: 'openstack',
        steps: [
            {
                command: 'openstack server list --long',
                output: `+--------------------------------------+---------------+--------+------------+-------------+------------------+------------+
| ID                                   | Name          | Status | Task State | Power State | Networks         | Image Name |
+--------------------------------------+---------------+--------+------------+-------------+------------------+------------+
| 8a7d6a37-e4b8-4e5c-9c2d-4fc61e294c1a| web-server-1  | ACTIVE | None       | Running     | private=10.0.0.2 | Ubuntu 20.04|
| 9b8e7f48-f5c9-5f6d-0d3e-5gd72f305d2b| web-server-2  | ACTIVE | None       | Running     | private=10.0.0.3 | Ubuntu 20.04|
| 0c9f8g59-g6d0-6g7e-1e4f-6he83g416e3c| db-server-1   | ACTIVE | None       | Running     | private=10.0.0.4 | Ubuntu 20.04|
+--------------------------------------+---------------+--------+------------+-------------+------------------+------------+`
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

// Update createFloatingTerminal function with better positioning and sizing
function createFloatingTerminal() {
    const terminal = document.createElement('div');
    terminal.className = 'floating-terminal';
    
    // Remove existing terminals
    const existingTerminals = document.querySelectorAll('.floating-terminal');
    existingTerminals.forEach(term => term.remove());
    
    // Get content dimensions for safe zones
    const content = document.querySelector('.content');
    const contentRect = content.getBoundingClientRect();
    const titleArea = document.querySelector('.typing-text').getBoundingClientRect();
    const techStack = document.querySelector('.tech-stack').getBoundingClientRect();
    
    // Define safe zones
    const safeZones = {
        top: titleArea.top,
        bottom: techStack.bottom,
        centerStart: titleArea.top - 20,
        centerEnd: techStack.bottom + 20
    };
    
    // Define positions that avoid the center
    const positions = [
        { top: '2%', left: '2%' },             // Top left
        { top: '2%', right: '2%' },            // Top right
        { bottom: '2%', left: '2%' },          // Bottom left
        { bottom: '2%', right: '2%' }          // Bottom right
    ];
    
    const randomIndex = Math.floor(Math.random() * positions.length);
    const position = positions[randomIndex];
    
    Object.keys(position).forEach(key => {
        terminal.style[key] = position[key];
    });
    
    const snippet = getNextCommand();
    
    // Adjust terminal size based on command content
    const commandSizes = {
        'kubectl': { width: 1200, height: 400 },
        'kubectl-2': { width: 1200, height: 300 },
        'openstack': { width: 1200, height: 300 },
        'docker': { width: 1000, height: 250 },
        'argocd': { width: 1100, height: 250 },
        'terraform': { width: 1000, height: 500 },
        'helm': { width: 1000, height: 500 },
        'ansible': { width: 900, height: 500 },
        'gcloud': { width: 900, height: 400 },
        'vault': { width: 800, height: 300 }
    };
    
    const defaultSize = { width: 800, height: 300 };
    const size = commandSizes[snippet.type] || defaultSize;
    
    terminal.style.width = `${size.width}px`;
    terminal.style.height = `${size.height}px`;
    
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
    
    // Adjust position to avoid overlapping
    setTimeout(() => {
        const terminalRect = terminal.getBoundingClientRect();
        
        // If terminal would overlap with center content
        if (terminalRect.bottom > safeZones.centerStart && terminalRect.top < safeZones.centerEnd) {
            if (position.top) {
                // If terminal is too close to title, move it higher
                terminal.style.top = '2%';
            } else {
                // If terminal is too close to tech stack, move it lower
                const bottomSpace = window.innerHeight - safeZones.bottom;
                const newBottom = Math.min(bottomSpace - terminalRect.height, window.innerHeight * 0.02);
                terminal.style.bottom = `${Math.max(2, newBottom)}%`;
            }
        }
        
        // Ensure terminal fits on screen horizontally
        if (terminalRect.right > window.innerWidth) {
            terminal.style.right = '2%';
            terminal.style.left = 'auto';
        }
        
        terminal.style.opacity = '1';
        runTerminalSequence(terminal, snippet).then(() => {
            const longOutputCommands = ['kubectl', 'kubectl-2', 'terraform', 'helm', 'ansible'];
            const visibilityTime = longOutputCommands.includes(snippet.type) ? 8000 : 6000;
            
            setTimeout(() => {
                terminal.style.opacity = '0';
                setTimeout(() => terminal.remove(), 1000);
            }, visibilityTime);
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
            background: rgba(20, 20, 20, 0.95);
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            font-family: 'Courier New', monospace;
            z-index: 3;
            opacity: 0;
            transition: opacity 0.5s ease;
            display: flex;
            flex-direction: column;
            overflow: hidden;
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
        }
    </style>
`);
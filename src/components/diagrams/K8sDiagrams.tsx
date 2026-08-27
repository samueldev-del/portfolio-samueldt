"use client";

import type { Lang } from "@/lib/i18n";
import { Arrow, Figure, Node } from "./primitives";

const copy = {
  de: {
    clusterTitle: "kind-Cluster — vom Host bis zum Pod",
    host: "Host (macOS)",
    hostA: "curl http://web.localdev.me:8080/",
    hostB: "curl http://localhost:30080",
    ingressCtl: "ingress-nginx Controller",
    ingressCtlSub: "hostPort 8080 → :80 · Node mit ingress-ready=true",
    nodeport: "Service web-nodeport",
    nodeportSub: "type: NodePort · nodePort 30080",
    rule1: "/",
    rule1Sub: "Prefix → web-svc:80",
    rule2: "/api(/|$)(.*)",
    rule2Sub: "rewrite-target /$2 → api-svc:80",
    webSvc: "web-svc",
    webSvcSub: "ClusterIP · selector app=web",
    apiSvc: "api-svc",
    apiSvcSub: "ClusterIP · selector app=api",
    cp: "lab-control-plane",
    w1: "lab-worker",
    w2: "lab-worker2",
    spread: "topologySpreadConstraints · maxSkew 1 über kubernetes.io/hostname",

    stateTitle: "Deklarierter Zustand — Deployment, Konfiguration, Proben",
    apply: "kubectl apply -f manifests/",
    applySub: "Manifeste im Repository sind die Wahrheit",
    deploy: "Deployment web",
    deploySub: "replicas: 3 · selector app=web",
    rs: "ReplicaSet",
    rsSub: "desired 3 · current 3 · ready 3",
    pods: "3 Pods nginx:alpine",
    podsSub: "requests 50m/32Mi · limits 200m/128Mi",
    cm: "ConfigMap web-config",
    cmSub: "index.html als Volume · APP_ENV als env",
    secret: "Secret web-secret",
    secretSub: "DB_PASSWORD als env · nie im Repository",
    probes: "readiness & liveness",
    probesSub: "httpGet / :80 · alle 5 s bzw. 10 s",
    rollout: "kubectl set image",
    rolloutSub: "neues ReplicaSet skaliert hoch",
    undo: "kubectl rollout undo",
    undoSub: "zurück auf die vorherige Revision",
    injects: "wird eingebunden",

    helmTitle: "Ein Chart, zwei Releases",
    chart: "chart/ — mywebapp",
    chartFiles: [
      "Chart.yaml",
      "templates/deployment.yaml",
      "templates/service.yaml",
      "templates/configmap.yaml",
      "_helpers.tpl",
    ],
    valuesDefault: "values.yaml",
    valuesDefaultSub: "replicaCount 3 · web.localdev.me",
    valuesDev: "values-dev.yaml",
    valuesDevSub: "replicaCount 1 · dev.localdev.me",
    overrides: "nur die Abweichungen",
    relWeb: "Release: web",
    relWebCmd: "helm install web ./chart",
    relWebA: "3 Pods · web.localdev.me",
    relWebB: "Revision 1",
    relDev: "Release: dev",
    relDevCmd: "helm install dev -f values-dev.yaml",
    relDevA: "1 Pod · dev.localdev.me",
    relDevB: "Revision 1",
    cmd1: "helm template",
    cmd1Sub: "lokal rendern, ohne Cluster",
    cmd2: "--dry-run=server",
    cmd2Sub: "serverseitige Validierung",
    cmd3: "helm history · rollback",
    cmd3Sub: "Revisionen, ganze Release zurück",
    checksum:
      "checksum/config im Pod-Template: ändert sich die ConfigMap, rollt das Deployment neu aus",
  },
  en: {
    clusterTitle: "kind cluster — from the host down to the pod",
    host: "Host (macOS)",
    hostA: "curl http://web.localdev.me:8080/",
    hostB: "curl http://localhost:30080",
    ingressCtl: "ingress-nginx controller",
    ingressCtlSub: "hostPort 8080 → :80 · node labelled ingress-ready=true",
    nodeport: "Service web-nodeport",
    nodeportSub: "type: NodePort · nodePort 30080",
    rule1: "/",
    rule1Sub: "Prefix → web-svc:80",
    rule2: "/api(/|$)(.*)",
    rule2Sub: "rewrite-target /$2 → api-svc:80",
    webSvc: "web-svc",
    webSvcSub: "ClusterIP · selector app=web",
    apiSvc: "api-svc",
    apiSvcSub: "ClusterIP · selector app=api",
    cp: "lab-control-plane",
    w1: "lab-worker",
    w2: "lab-worker2",
    spread: "topologySpreadConstraints · maxSkew 1 across kubernetes.io/hostname",

    stateTitle: "Declared state — deployment, configuration, probes",
    apply: "kubectl apply -f manifests/",
    applySub: "the manifests in the repository are the truth",
    deploy: "Deployment web",
    deploySub: "replicas: 3 · selector app=web",
    rs: "ReplicaSet",
    rsSub: "desired 3 · current 3 · ready 3",
    pods: "3 pods of nginx:alpine",
    podsSub: "requests 50m/32Mi · limits 200m/128Mi",
    cm: "ConfigMap web-config",
    cmSub: "index.html as a volume · APP_ENV as env",
    secret: "Secret web-secret",
    secretSub: "DB_PASSWORD as env · never in the repository",
    probes: "readiness & liveness",
    probesSub: "httpGet / :80 · every 5 s and 10 s",
    rollout: "kubectl set image",
    rolloutSub: "a new ReplicaSet scales up",
    undo: "kubectl rollout undo",
    undoSub: "back to the previous revision",
    injects: "injected into every pod",

    helmTitle: "One chart, two releases",
    chart: "chart/ — mywebapp",
    chartFiles: [
      "Chart.yaml",
      "templates/deployment.yaml",
      "templates/service.yaml",
      "templates/configmap.yaml",
      "_helpers.tpl",
    ],
    valuesDefault: "values.yaml",
    valuesDefaultSub: "replicaCount 3 · web.localdev.me",
    valuesDev: "values-dev.yaml",
    valuesDevSub: "replicaCount 1 · dev.localdev.me",
    overrides: "only the differences",
    relWeb: "Release: web",
    relWebCmd: "helm install web ./chart",
    relWebA: "3 pods · web.localdev.me",
    relWebB: "Revision 1",
    relDev: "Release: dev",
    relDevCmd: "helm install dev -f values-dev.yaml",
    relDevA: "1 pod · dev.localdev.me",
    relDevB: "Revision 1",
    cmd1: "helm template",
    cmd1Sub: "render locally, no cluster",
    cmd2: "--dry-run=server",
    cmd2Sub: "server-side validation",
    cmd3: "helm history · rollback",
    cmd3Sub: "revisions, whole release back",
    checksum:
      "checksum/config on the pod template: change the ConfigMap and the deployment rolls",
  },
};

function Pod({ x, y, label, tone }: { x: number; y: number; label: string; tone: string }) {
  return (
    <g>
      <rect x={x} y={y} width={92} height={22} rx={6} fill={tone} stroke="#d5c7b3" strokeWidth={1.2} />
      <text
        x={x + 46}
        y={y + 15}
        textAnchor="middle"
        fill="#3b332c"
        fontSize={9.5}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {label}
      </text>
    </g>
  );
}

function ClusterNode({
  x,
  y,
  name,
  pods,
}: {
  x: number;
  y: number;
  name: string;
  pods: Array<[string, string]>;
}) {
  return (
    <g>
      <rect x={x} y={y} width={232} height={112} rx={12} fill="#f7f2ea" stroke="#e0d4c2" strokeWidth={1.5} />
      <text
        x={x + 16}
        y={y + 24}
        fill="#211b16"
        fontSize={11.5}
        fontWeight={700}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {name}
      </text>
      {pods.map(([label, tone], i) => (
        <Pod key={label} x={x + 16 + (i % 2) * 104} y={y + 36 + Math.floor(i / 2) * 30} label={label} tone={tone} />
      ))}
    </g>
  );
}

export function ClusterDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <Figure title={t.clusterTitle} viewBox="0 0 760 552" minWidth={660} lang={lang}>
      {/* host */}
      <rect x={16} y={16} width={728} height={70} rx={12} fill="#f7f2ea" stroke="#e0d4c2" strokeWidth={1.5} />
      <text x={34} y={38} fill="#211b16" fontSize={12.5} fontWeight={700}>
        {t.host}
      </text>
      {[t.hostA, t.hostB].map((line, i) => (
        <text
          key={line}
          x={34 + i * 372}
          y={62}
          fill="#5c5349"
          fontSize={10.5}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {line}
        </text>
      ))}

      <Arrow d="M 176 86 L 176 112" />
      <Arrow d="M 560 86 L 560 112" />

      <Node x={40} y={116} w={280} h={56} tone="blue" label={t.ingressCtl} sub={t.ingressCtlSub} />
      <Node x={420} y={116} w={280} h={56} tone="purple" label={t.nodeport} sub={t.nodeportSub} />

      {/* ingress rules */}
      <Arrow d="M 110 172 L 110 200" />
      <Arrow d="M 250 172 L 250 200" />
      <Node x={30} y={204} w={160} h={52} tone="neutral" label={t.rule1} sub={t.rule1Sub} mono />
      <Node x={206} y={204} w={190} h={52} tone="neutral" label={t.rule2} sub={t.rule2Sub} mono />

      {/* services */}
      <Arrow d="M 110 256 L 110 288" />
      <Arrow d="M 301 256 L 301 288" />
      <Node x={30} y={292} w={160} h={52} tone="green" label={t.webSvc} sub={t.webSvcSub} mono />
      <Node x={216} y={292} w={170} h={52} tone="green" label={t.apiSvc} sub={t.apiSvcSub} mono />

      {/* down into the nodes */}
      <Arrow d="M 110 344 L 110 392" />
      <Arrow d="M 301 344 L 301 392" />
      <Arrow d="M 560 172 L 560 392" dashed />

      <ClusterNode
        x={16}
        y={396}
        name={t.cp}
        pods={[
          ["ingress-nginx", "#e3ecf8"],
          ["web-…", "#efe7db"],
        ]}
      />
      <ClusterNode
        x={264}
        y={396}
        name={t.w1}
        pods={[
          ["web-…", "#efe7db"],
          ["api-…", "#eae7f8"],
        ]}
      />
      <ClusterNode
        x={512}
        y={396}
        name={t.w2}
        pods={[
          ["web-…", "#efe7db"],
          ["api-…", "#eae7f8"],
        ]}
      />

      <text x={380} y={534} textAnchor="middle" fill="#7a7066" fontSize={10}>
        {t.spread}
      </text>
    </Figure>
  );
}

export function DeclaredStateDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <Figure title={t.stateTitle} viewBox="0 0 760 440" minWidth={660} lang={lang}>
      <Node x={16} y={20} w={300} h={54} tone="neutral" label={t.apply} sub={t.applySub} mono />
      <Arrow d="M 166 74 L 166 100" />
      <Node x={16} y={104} w={300} h={54} tone="blue" label={t.deploy} sub={t.deploySub} />
      <Arrow d="M 166 158 L 166 184" />
      <Node x={16} y={188} w={300} h={54} tone="neutral" label={t.rs} sub={t.rsSub} mono />
      <Arrow d="M 166 242 L 166 268" />
      <Node x={16} y={272} w={300} h={54} tone="green" label={t.pods} sub={t.podsSub} mono />

      {/* injected sources */}
      <Node x={430} y={104} w={314} h={54} tone="green" label={t.cm} sub={t.cmSub} mono />
      <Node x={430} y={188} w={314} h={54} tone="maroon" label={t.secret} sub={t.secretSub} mono />
      <Node x={430} y={272} w={314} h={54} tone="purple" label={t.probes} sub={t.probesSub} mono />

      <Arrow d="M 426 131 L 380 131 L 380 286 L 322 286" dashed />
      <Arrow d="M 426 215 L 400 215 L 400 300 L 322 300" dashed />
      <Arrow d="M 426 299 L 360 299 L 360 314 L 322 314" dashed />
      <text x={376} y={350} textAnchor="middle" fill="#7a7066" fontSize={10}>
        {t.injects}
      </text>

      {/* rollout strip */}
      <Node x={16} y={372} w={330} h={50} tone="neutral" label={t.rollout} sub={t.rolloutSub} mono />
      <Node x={414} y={372} w={330} h={50} tone="brown" label={t.undo} sub={t.undoSub} mono />
      <Arrow d="M 346 397 L 410 397" />
    </Figure>
  );
}

/** A file chip inside the chart panel. */
function FileChip({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={212} height={26} rx={7} fill="#efe7db" stroke="#d5c7b3" strokeWidth={1.2} />
      <text
        x={x + 12}
        y={y + 17}
        fill="#3b332c"
        fontSize={10}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {label}
      </text>
    </g>
  );
}

/** A release: the command that produced it, and what it actually runs. */
function ReleasePanel({
  x,
  y,
  title,
  cmd,
  lineA,
  lineB,
}: {
  x: number;
  y: number;
  title: string;
  cmd: string;
  lineA: string;
  lineB: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={230} height={104} rx={12} fill="#e3f0e7" stroke="#93c2a7" strokeWidth={1.5} />
      <text x={x + 16} y={y + 26} fill="#211b16" fontSize={13} fontWeight={700}>
        {title}
      </text>
      {[cmd, lineA, lineB].map((line, i) => (
        <text
          key={line}
          x={x + 16}
          y={y + 48 + i * 19}
          fill="#5c5349"
          fontSize={9.5}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function HelmReleaseDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <Figure title={t.helmTitle} viewBox="0 0 760 470" minWidth={680} lang={lang}>
      {/* the chart itself */}
      <rect x={16} y={40} width={244} height={252} rx={12} fill="#f7f2ea" stroke="#e0d4c2" strokeWidth={1.5} />
      <text
        x={32}
        y={66}
        fill="#211b16"
        fontSize={11.5}
        fontWeight={700}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {t.chart}
      </text>
      {t.chartFiles.map((file, i) => (
        <FileChip key={file} x={32} y={80 + i * 38} label={file} />
      ))}

      {/* values, defaults and the override that only carries deltas */}
      <Node x={280} y={70} w={214} h={56} tone="neutral" label={t.valuesDefault} sub={t.valuesDefaultSub} mono />
      <Node x={280} y={196} w={214} h={56} tone="brown" label={t.valuesDev} sub={t.valuesDevSub} mono />
      <Arrow d="M 260 98 L 276 98" />
      <Arrow d="M 260 224 L 276 224" />
      <Arrow d="M 387 126 L 387 192" dashed />
      <text x={397} y={165} fill="#7a7066" fontSize={10}>
        {t.overrides}
      </text>

      <ReleasePanel x={514} y={46} title={t.relWeb} cmd={t.relWebCmd} lineA={t.relWebA} lineB={t.relWebB} />
      <ReleasePanel x={514} y={172} title={t.relDev} cmd={t.relDevCmd} lineA={t.relDevA} lineB={t.relDevB} />
      <Arrow d="M 494 98 L 510 98" />
      <Arrow d="M 494 224 L 510 224" />

      {/* what the workflow around a release looks like */}
      <Node x={16} y={330} w={228} h={52} tone="neutral" label={t.cmd1} sub={t.cmd1Sub} mono />
      <Node x={264} y={330} w={228} h={52} tone="neutral" label={t.cmd2} sub={t.cmd2Sub} mono />
      <Node x={512} y={330} w={232} h={52} tone="purple" label={t.cmd3} sub={t.cmd3Sub} mono />

      <text x={380} y={422} textAnchor="middle" fill="#7a7066" fontSize={10}>
        {t.checksum}
      </text>
    </Figure>
  );
}

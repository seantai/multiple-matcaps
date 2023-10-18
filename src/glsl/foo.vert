varying vec3 vViewPosition;

#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <normal_pars_vertex>
#include <skinning_pars_vertex>
#include <uv_pars_vertex>

#include <clipping_planes_pars_vertex>
#include <logdepthbuf_pars_vertex>

uniform float u_time;
varying vec2 v_uv;
uniform float u_clickFloat;

void main() {

#include <beginnormal_vertex>
#include <color_vertex>
#include <defaultnormal_vertex>
#include <morphcolor_vertex>
#include <morphnormal_vertex>
#include <normal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <uv_vertex>

#include <begin_vertex>
#include <displacementmap_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
#include <skinning_vertex>

#include <clipping_planes_vertex>
#include <fog_vertex>
#include <logdepthbuf_vertex>

  v_uv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.y += sin(modelPosition.y + u_time) * sin(u_time) * .051;

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;

  vViewPosition = -mvPosition.xyz;
}

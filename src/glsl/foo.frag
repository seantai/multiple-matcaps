uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D u_metalMatcapTexture;
uniform sampler2D u_goldMatcapTexture;
uniform sampler2D u_reflection5MatcapTexture;
uniform vec2 u_pointer;

varying vec3 vViewPosition;

#include <alphahash_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <bumpmap_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <map_pars_fragment>
#include <normal_pars_fragment>
#include <normalmap_pars_fragment>
#include <uv_pars_fragment>

void main() {

#include <clipping_planes_fragment>

  vec4 diffuseColor = vec4(diffuse, opacity);

#include <alphahash_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <color_fragment>
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>

  vec3 viewDir = normalize(vViewPosition);
  vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
  vec3 y = cross(viewDir, x);
  vec2 uv = vec2(dot(x, normal), dot(y, normal)) * 0.495 +
            0.5; // 0.495 to remove artifacts caused by undersized matcap disks

  vec4 metalMatcap = texture2D(u_metalMatcapTexture, uv);
  vec4 goldMatcap = texture2D(u_goldMatcapTexture, uv);
  vec4 reflection5Matcap = texture2D(u_reflection5MatcapTexture, uv);

  // vec4 matcapColor =
  //     vec4(vec3(mix(0.2, 0.8, uv.y)), 1.0); // none/debug color

  vec3 matcapMix = mix(mix(metalMatcap.rgb, goldMatcap.rgb, u_pointer.x),
                       reflection5Matcap.rgb, u_pointer.y);
  vec3 outgoingLight = matcapMix;

#include <colorspace_fragment>
#include <dithering_fragment>
#include <fog_fragment>
#include <opaque_fragment>
#include <premultiplied_alpha_fragment>
#include <tonemapping_fragment>
}
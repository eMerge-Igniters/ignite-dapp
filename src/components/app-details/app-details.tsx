import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-details',
  styleUrl: 'app-details.css',
})
export class AppDetails {

  @Prop() heading: String;

  render() {
    return (
      <Host>
         <div style={{
           height: 'calc(100vh - 64px)'
         }} class="bg-gray-100 py-8 overflow-y-auto">
       <div class="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div class="mb-8 space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="p-4">
                <img class="max-w-full rounded-xl overflow-hidden" src="https://images.unsplash.com/photo-1474224017046-182ece80b263?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"/>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quiepakis nostrud exercitation ullamco laboris nsi ut aliquip ex ea comepmodo consetquat. Duis aute irure dolor in reprehenderit in voluptate velit esse cfgillum dolore eutpe fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt inpeku culpa qui officia deserunt mollit anim id est laborum.
</p><p class="mt-3">
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium poeyi doloremque laudantium, totam rem aperiam, eaque ipsa quae apsb illo inventore veritatis et quasi architecto beiatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, seprid quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliqueam quaerat voluptatem.
                </p>
              </div>
            </div>
          </section>
        </div>

<section aria-labelledby="updates-title" class="lg:col-start-3 lg:col-span-1">
            <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-5 sm:px-6">
                  <h2 id="updates-title" class="text-lg font-medium text-gray-900">Updates</h2>
                </div>
                <div class="px-4 py-6 sm:px-6">
                  <ul role="list" class="space-y-8">

                      <li>
                        <div class="flex space-x-3">
                          <div>
                            <div class="text-sm">
                              <a href="#" class="font-medium text-gray-900">Leslie Alexander</a>
                            </div>
                            <div class="mt-1 text-sm text-gray-700">
                              <p>Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.</p>
                            </div>
                            <div class="mt-2 text-sm space-x-2">
                              <span class="text-gray-500 font-medium">4d ago</span>
                              <span class="text-gray-500 font-medium">·</span>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div class="flex space-x-3">
                          <div>
                            <div class="text-sm">
                              <a href="#" class="font-medium text-gray-900">Michael Foster</a>
                            </div>
                            <div class="mt-1 text-sm text-gray-700">
                              <p>Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.</p>
                            </div>
                            <div class="mt-2 text-sm space-x-2">
                              <span class="text-gray-500 font-medium">4d ago</span>
                              <span class="text-gray-500 font-medium">·</span>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div class="flex space-x-3">
                          <div>
                            <div class="text-sm">
                              <a href="#" class="font-medium text-gray-900">Dries Vincent</a>
                            </div>
                            <div class="mt-1 text-sm text-gray-700">
                              <p>Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.</p>
                            </div>
                            <div class="mt-2 text-sm space-x-2">
                              <span class="text-gray-500 font-medium">4d ago</span>
                              <span class="text-gray-500 font-medium">·</span>
                            </div>
                          </div>
                        </div>
                      </li>

                  </ul>
                </div>
              </div>
            </div>
          </section>
       </div>
      </div>
      </Host>
    );
  }

}

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>
              <span class="glyphicon glyphicon-list-alt"></span> Agenda
            </h3>
            <h5 class="text-info">
              <i>info</i>
            </h5>
            <div class="col-md-3 col-md-offset-9">
              <form action="{{}}" class="search-form">
                <div class="form-group has-feedback">
                  <label for="search" class="sr-only">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    name="search"
                    id="searchA"
                    placeholder="Busca por processo"
                  />
                  <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </form>
            </div>
          </div>

          <div class="panel-body">
            <div class="row">
              <div class="col-md-12">
                <form>
                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Processo</label>
                    <input
                      name="NumProcesso "
                      id="NumProcesso "
                      class="form-control"
                      type="text"
                      placehold="informe..."
                      value="NumProcesso "
                    />
                  </div>

                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Expediente</label>
                    <input
                      name="Expediente "
                      id="Expediente "
                      class="form-control"
                      type="text"
                      placehold="informe..."
                      value="Expediente "
                    />
                  </div>

                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Reclamante</label>
                    <input
                      name="Reclamante "
                      id="Reclamante "
                      class="form-control"
                      type="text"
                      placehold="informe..."
                      value="Reclamante "
                    />
                  </div>

                  <div class="form-group col-md-4">
                    <label for="CodPreposto">Preposto</label>
                    <select id="CodPreposto" class="form-control">
                      <option selected>Choose...</option>
                      <option value="CodPreposto">...nome do Preposto</option>
                      <option value="CodPreposto">...nome do Preposto</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label class="col-form-label" for>Vara</label>
                    <select id="Vara" class="form-control">
                      <option selected>Choose...</option>
                      <option value="Vara">...nome do Vara</option>
                      <option value="Vara">...nome do Vara</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label class="col-form-label" for>Comarca</label>
                    <select id="Comarca" class="form-control">
                      <option selected>Choose...</option>
                      <option value="Comarca">...nome do Comarca</option>
                      <option value="Comarca">...nome do Comarca</option>
                    </select>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="col-form-label" for>Advogado</label>
                    <select id="MatrAdv" class="form-control">
                      <option selected>Choose...</option>
                      <option value="MatrAdv">...nome do Advogado</option>
                      <option value="MatrAdv">...nome do Advogado</option>
                    </select>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="col-form-label" for>Assunto</label>
                    <select id="Assunto" class="form-control">
                      <option selected>Choose...</option>
                      <option value="Assunto">...nome do Assunto</option>
                      <option value="Assunto">...nome do Assunto</option>
                    </select>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="col-form-label" for>Unidade Subsídio</label>
                    <select id="UnidadeSubsidio" class="form-control">
                      <option selected>Choose...</option>
                      <option value="UnidadeSubsidio">...nome do UnidadeSubsidio</option>
                      <option value="UnidadeSubsidio">...nome do UnidadeSubsidio</option>
                    </select>
                  </div>

                  <div class="form-group col-md-4">
                    <label class="col-form-label" for>Atendimento Subsídio</label>
                    <select id="AtendSubsidio" class="form-control">
                      <option selected>Choose...</option>
                      <option value="AtendSubsidio">...nome do AtendSubsidio</option>
                      <option value="AtendSubsidio">...nome do AtendSubsidio</option>
                    </select>
                  </div>

                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Observacao</label>
                    <textarea name="Observacao" id="Observacao" class="form-control" rows="3"></textarea>
                  </div>

                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Litisconsorte do Réu</label>
                    <input
                      name="LitisconsorteReu "
                      id="LitisconsorteReu "
                      class="form-control"
                      type="text"
                      placehold="informe..."
                      value="LitisconsorteReu "
                    />
                  </div>

                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Link Petição Inicial</label>
                    <input
                      name="LinkPeticaoInicial "
                      id="LinkPeticaoInicial "
                      class="form-control"
                      type="url"
                      placehold="informe..."
                      value="LinkPeticaoInicial "
                    />
                  </div>

                  <div class="form-group col-md-2">
                    <label class="col-form-label" for>Link Defesa</label>
                    <input
                      name="LinkDefesa "
                      id="LinkDefesa "
                      class="form-control"
                      type="url"
                      placehold="informe..."
                      value="http://portal.dijur.caixa/"
                    />
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <!-- float-left -->
                      <div style="clear:both">
                        <div class="form-group col-md-3=6">
                          <button class="btn btn-primary" type="submit">
                            <span class="glyphicon glyphicon-floppy-disk"></span> Salvar
                          </button>
                          <button class="btn btn-default" type="cancel">
                            <span class></span>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ----------------------------- listagem --------------------------------- -->
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Panel title</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 table-responsive">
                <table class="table table-light table-sm">
                  <thead class="thead-light">
                    <tr>
                      <th>Processo</th>
                      <th>Expediente</th>
                      <th>Reclamante</th>
                      <th>Vara</th>
                      <th>Comarca</th>
                      <th>Advogado</th>
                      <th>Assunto</th>
                      <th>Unidade Subsidio</th>
                      <th>Atend. Subsidio</th>
                      <th>Obs.:</th>
                      <th>LitisconsorteReu</th>
                      <th>LinkPeticaoInicial</th>
                      <th>LinkDefesa</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>NumProcesso</td>
                      <td>Expediente</td>
                      <td>Reclamante</td>
                      <td>Vara</td>
                      <td>Comarca</td>
                      <td>MatrAdv + Nome</td>
                      <td>Assunto</td>
                      <td>UnidadeSubsidio</td>
                      <td>AtendSubsidio</td>
                      <td>Observacao</td>
                      <td>LitisconsorteReu</td>
                      <td>LinkPeticaoInicial</td>
                      <td>LinkDefesa</td>
                      <td>
                        <a title="Editar">
                          <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a title="Excluir">
                          <span class="glyphicon glyphicon-trash"></span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>